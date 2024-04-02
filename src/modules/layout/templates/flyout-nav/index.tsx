import { getFlyoutNav } from '@lib/data/content';
import LocalizedServerLink from '@modules/common/components/localized-server-link';
import ChevronDown from '@modules/common/icons/chevron-down';
import React from 'react';
import { StrapiNestedLinkComponent } from 'types/strapi';

type Props = {
  lang: string;
  locale: string;
};

async function FlyoutNav({ lang, locale }: Props) {
  const content = (await getFlyoutNav(lang))?.data?.flyout_nav;
  console.log(JSON.stringify(content, null, 2));

  return (
    <header className="hidden md:block">
      <nav className="content-container bg-white">
        <div className="">
          <ul className="flex items-center font-poppins space-x-4">
            {content &&
              content.map((menu: StrapiNestedLinkComponent) => (
                <li>
                  {menu?.child && menu.child?.length > 0 ? (
                    <details className="dropdown dropdown-hover">
                      <summary className="btn border-none shadow-none">
                        <span>{menu.title}</span>
                        <ChevronDown />
                      </summary>
                      <ul className="dropdown-content z-20 rounded-b-md p-2 bg-white w-36">
                        {menu.child.map((item) => (
                          <li className="px-2 mt-2">
                            <LocalizedServerLink
                              linkProps={{
                                href: item.url,
                              }}
                              locale={locale}
                              lang={lang}
                            >
                              {item.title}
                            </LocalizedServerLink>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <LocalizedServerLink
                      linkProps={{
                        className: 'btn border-none shadow-none',
                        href: menu.url,
                      }}
                      locale={locale}
                      lang={lang}
                    >
                      {menu.title}
                    </LocalizedServerLink>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default FlyoutNav;
