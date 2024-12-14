import { ComponentProps, PropsWithChildren } from 'react';

type CellProps = PropsWithChildren & ComponentProps<'td'>;

function Cell({ children, className, ...rest }: CellProps) {
  return (
    <td className={`p-3 align-top border-t-[1px] border-solid border-[#dee2e6] ${className}`} {...rest}>
      {children}
    </td>
  );
}

export default Cell;
