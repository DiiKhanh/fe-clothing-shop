import { FormEventHandler, ReactNode } from 'react';
import { FormProvider as Form } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

type FormProviderProps = {
  children: ReactNode;
  methods: UseFormReturn<any, any>;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export default function FormProvider({ children, onSubmit, methods }: FormProviderProps) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
