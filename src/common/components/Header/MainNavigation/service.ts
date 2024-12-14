import { v4 as uuid } from 'uuid';

export const getDefaultCategories = () => {
  return [
    {
      _id: uuid(),
      name: 'GU THIẾT KẾ',
      types: [
        {
          type: 'GU 12 Vị Anh Hùng Dân Tộc',
          _id: uuid(),
        },
        {
          type: 'GU Thần Cổ Đại',
          _id: uuid(),
        },
        {
          type: 'GU Ngân Hà',
          _id: uuid(),
        },
      ],
    },
    {
      _id: uuid(),
      name: 'GU UNISEX',
      types: [
        {
          type: 'GU Linh Vật',
          _id: uuid(),
        },
        {
          type: 'GU Y Nguyên Bản 18-',
          _id: uuid(),
        },
      ],
    },
    {
      _id: uuid(),
      name: 'GU TỐI GIẢN',
      types: [],
    },
    {
      _id: uuid(),
      name: 'GU ĐƠN GIẢN',
      types: [
        {
          type: 'Áo thun đơn giản',
          _id: uuid(),
        },
        {
          type: 'Áo khoác đơn giản',
          _id: uuid(),
        },
        {
          type: 'Quần dài đơn giản',
          _id: uuid(),
        },
      ],
    },
    {
      _id: uuid(),
      name: 'GU THỂ THAO',
      types: [],
    },
    {
      _id: uuid(),
      name: 'PHỤ KIỆN',
      types: [
        {
          type: 'Nón',
          _id: uuid(),
        },
        {
          type: 'Tất - Vớ',
          _id: uuid(),
        },
        {
          type: 'Dây Nịt Da',
          _id: uuid(),
        },
      ],
    },
    {
      _id: uuid(),
      name: 'Áo mùa đông',
      types: [
        {
          type: 'Áo',
          _id: uuid(),
        },
        {
          type: 'Áo len',
          _id: uuid(),
        },
      ],
    },
  ];
};
