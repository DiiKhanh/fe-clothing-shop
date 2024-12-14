/* eslint-disable jsx-a11y/alt-text */
import { Document, Font, Line, Page, StyleSheet, Svg, Text, View, Image } from '@react-pdf/renderer';
import { printNumberWithCommas } from '@/utils/common';
import InvoiceTable from '../InvoiceTable';
import { appAssets } from '@/common/assets';
import { CartItem } from '@/types/customer';
import { Product } from '@/types/product';
import { ReactElement } from 'react';

type InvoiceCompanyProps = {
  products: CartItem[];
  formData: {
    companyName: string;
    companyAddress: string;
    companyTaxNumber: string;
  };
};

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-lightitalic-webfont.woff',
      fontStyle: 'italic',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
      fontWeight: 500,
    },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 600 },
  ],
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    fontFamily: 'Roboto',
  },
  logo: { width: 50, height: 50, objectFit: 'cover' },
  websiteInforContainer: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 8,
    fontWeight: 'light',
    gap: 10,
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 8,
    fontWeight: 'normal',
  },
  company: {
    fontSize: 8,
  },
  detailPrice: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
    fontWeight: 'medium',
    marginTop: 4,
  },
  thanks: { fontSize: 10, textAlign: 'center' },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
});

function InvoiceCompany({ products, formData }: InvoiceCompanyProps): ReactElement {
  const totalProductsPrice = products.reduce((acc, cur) => {
    return acc + (cur.productId as Product).price * cur.quantity;
  }, 0);
  const tax = totalProductsPrice * 0.1;
  const totalPrice = totalProductsPrice + tax + 25000;

  return (
    <Document language="vietnamese">
      <Page style={styles.body} size="A6" wrap={false}>
        <View style={styles.websiteInforContainer}>
          <Image src={appAssets.logo} style={styles.logo} />
          <View>
            <Text>Clothing Shop</Text>
            <Text>Địa chỉ: UIT</Text>
            <Text>Số điện thoại: 0886025625</Text>
            <Text>Email: duykhanh.030803@gmail.com</Text>
          </View>
        </View>
        <Text style={styles.title}>CLOTHING SHOP</Text>
        <Text style={styles.subTitle}>HÓA ĐƠN THANH TOÁN</Text>

        <Text style={styles.description}>Ngày: {new Date().toLocaleString()}</Text>
        <Text style={styles.company}>Công ty: {formData.companyName}</Text>
        <Text style={styles.company}>Địa chỉ: {formData.companyAddress}</Text>
        <Text style={styles.company}>Mã số thuế: {formData.companyTaxNumber}</Text>

        <InvoiceTable cartProducts={products} />
        <View style={styles.detailPrice}>
          <Text>Tạm tính</Text>
          <Text>{printNumberWithCommas(totalProductsPrice)}đ</Text>
        </View>
        <View style={styles.detailPrice}>
          <Text>Thuế</Text>
          <Text>{printNumberWithCommas(tax)}đ</Text>
        </View>
        <View style={styles.detailPrice}>
          <Text>Phí vận chuyển</Text>
          <Text>25,000đ</Text>
        </View>
        <View style={styles.detailPrice}>
          <Text>Tổng thanh toán</Text>
          <Text>{printNumberWithCommas(totalPrice)}đ</Text>
        </View>
        <Svg height={20} style={{ marginVertical: 4 }}>
          <Line x1="0" y1="0" x2="260" y2="0" strokeWidth={2} stroke="#000" />
        </Svg>
        <Text style={styles.thanks}>Trân trọng cảm ơn, hẹn gặp lại quý khách</Text>
      </Page>
    </Document>
  );
}

export default InvoiceCompany;
