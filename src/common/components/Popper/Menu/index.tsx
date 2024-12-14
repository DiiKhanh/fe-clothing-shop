import { JSXElementConstructor, ReactElement } from 'react';
import Link from 'next/link';
import Tippy from '@tippyjs/react/headless';
import PopperWrapper from './components/PopperWrapper';
import MenuItem from './components/Item';
import { Category, CategoryType } from '@/types/category';
import 'tippy.js/dist/tippy.css';

type MenuProps = {
  items: Category[] | CategoryType[];
  children: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
  detail?: boolean;
};

function Menu({ items = [], children, detail = false }: MenuProps) {
  return (
    <Tippy
      delay={[0, 100]}
      interactive
      placement="bottom-start"
      offset={[12, 8]}
      render={(attrs) => (
        <div
          className={`absolute top-3 left-[-18px] inline-flex animate-headerMenuFadeIn ${detail && 'left-[-100px]'}`}
          tabIndex={-1}
          {...attrs}
        >
          <PopperWrapper>
            {detail ? (
              <div className="flex flex-wrap">
                {(items as Category[]).map((item, index) => (
                  <div key={index} className="p-4 px-[26px] text-[#f3f3f4]">
                    <Link
                      className="hover:text-primary transition duration-300"
                      href={{
                        pathname: `/category/${item._id}`,
                        query: { title: item.name },
                      }}
                      as={`/category/${item._id}`}
                    >
                      {item.name}
                    </Link>
                    <ul>
                      {item.types.map((child, index) => (
                        <li className="hover:text-primary transition duration-300" key={index}>
                          <Link
                            href={{
                              pathname: `/category/${child._id}`,
                              query: { title: child.type },
                            }}
                            as={`/category/${child._id}`}
                          >
                            {child.type}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              items.map((item, index) => <MenuItem key={index} categoryType={item as CategoryType} />)
            )}
          </PopperWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
