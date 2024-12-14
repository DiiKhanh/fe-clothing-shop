import React, { ReactElement, useImperativeHandle } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Title from '@/common/components/_shared/UIElements/Title';
import RHFTextField from '@/common/components/Form/RHFTextField';
import FormProvider from '@/common/components/Form/FormProvider';
import Button from '@/common/components/Buttons/Button';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoiceCompany from './components/InvoiceCompany';
import { useSelector } from 'react-redux';
import { selectCartProducts } from '@/redux/slices/cart';
import { Box } from '@mui/material';

type CompanyBillProps = {
};

export type RefType = {
  getInvoiceCompany: () => {
    companyName: string;
    companyAddress: string;
    companyTaxNumber: string;
  };
};

const CompanyBill = React.forwardRef<RefType, CompanyBillProps>(function CompanyBill(props, ref): ReactElement {
  const cartProducts = useSelector(selectCartProducts);

  const BillSchema = Yup.object().shape({
    companyName: Yup.string().required('Vui lòng nhập tên công ty'),
    companyAddress: Yup.string().required('Vui lòng nhập địa chỉ công ty'),
    companyTaxNumber: Yup.string().required('Vui lòng nhập mã số thuế'),
  });

  const defaultValues = {
    companyName: '',
    companyAddress: '',
    companyTaxNumber: '',
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(BillSchema),
  });

  const { handleSubmit, getValues, watch, formState } = methods;
  const formData = watch();

  const onSubmit = () => {
  };

  useImperativeHandle(ref, () => ({
    getInvoiceCompany: () => {
      const invoiceCompany = {
        companyName: getValues('companyName'),
        companyAddress: getValues('companyAddress'),
        companyTaxNumber: getValues('companyTaxNumber'),
      };
      return invoiceCompany;
    },
  }));

  return (
    <Box sx={{ mt: 3 }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Title sx={{ fontSize: '1rem' }}>Xuất hóa đơn cho công ty</Title>
        </AccordionSummary>
        <AccordionDetails>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField name="companyName" label="Tên công ty" id="companyName" />
            <RHFTextField name="companyAddress" label="Địa chỉ công ty" id="companyAddress" />
            <RHFTextField name="companyTaxNumber" label="Mã số thuế" id="companyTaxNumber" />
          </FormProvider>
          {formState.isValid ? (
            <PDFDownloadLink
              document={<InvoiceCompany products={cartProducts} formData={formData} />}
              fileName={`Bill_ClothingShop_${getValues('companyName')}`}
              style={{ textDecoration: 'none' }}
            >
              {({ error }) => (
                <>
                  {error && <span className="text-primary">Đã xảy ra lỗi</span>}
                  <Button type="submit">In hóa đơn</Button>
                </>
              )}
            </PDFDownloadLink>
          ) : (
            <Button type="submit" disabled>
              In hóa đơn
            </Button>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
});

export default CompanyBill;
