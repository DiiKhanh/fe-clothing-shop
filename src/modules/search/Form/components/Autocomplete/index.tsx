import React, { useMemo } from 'react';
import { createElement, Fragment, useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { usePagination, useSearchBox } from 'react-instantsearch-hooks';
import { autocomplete, AutocompleteOptions } from '@algolia/autocomplete-js';
import type { Render } from '@algolia/autocomplete-js';
import { BaseItem } from '@algolia/autocomplete-core';
import type { SearchClient } from 'algoliasearch/lite';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import '@algolia/autocomplete-theme-classic';
import { useRouter } from 'next/router';
import config from '@/config';
import useCart from '@/hooks/useCart';
import Image from 'next/image';
import { SIZES } from '@/utils/constants';
import { env } from '@/config/env';

type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>> & {
  searchClient: SearchClient;
  className?: string;
};

type SetInstantSearchUiStateOptions = {
  query: string;
  category?: string;
};

export function Autocomplete({ className, searchClient, ...autocompleteProps }: AutocompleteProps) {
  const autocompleteContainer = useRef<HTMLDivElement>(null);
  const { query, refine: setQuery } = useSearchBox();
  const { refine: setPage } = usePagination();
  const router = useRouter();
  const [instantSearchUiState, setInstantSearchUiState] = useState<SetInstantSearchUiStateOptions>({
    query,
    category: '',
  });
  const { handleAddToCart } = useCart();

  useEffect(() => {
    setQuery(instantSearchUiState.query);
    setPage(0);
  }, [instantSearchUiState.query, setPage, setQuery]);

  const plugins = useMemo(() => {
    const querySuggestionsPlugin = createQuerySuggestionsPlugin({
      searchClient,
      indexName: 'product',
      transformSource({ source }) {
        return {
          ...source,
          onSelect({ item }) {
            setInstantSearchUiState({
              query: item.name.toString(),
              category: item.__autocomplete_qsCategory,
            });
            router.replace({ pathname: config.routes.search, query: { keyword: item.name.toString() } });
          },
          templates: {
            ...source.templates,
            header({ items }) {
              if (items.length === 0) {
                return <Fragment />;
              }

              return (
                <Fragment>
                  <span className="aa-SourceHeaderTitle">Danh sách sản phẩm</span>
                  <span className="aa-SourceHeaderLine" />
                </Fragment>
              );
            },
            item({ item, components }) {
              return (
                <div className="aa-ItemWrapper">
                  <div className="aa-ItemContent">
                    <div className="aa-ItemIcon aa-ItemIcon--alignTop">
                      <Image
                        src={`${env.CLOUDINARY_PREFIX_PATH}/${(item.images as any).mainImg}`}
                        alt={`${item.name}`}
                        width="60"
                        height="60"
                      />
                    </div>
                    <div className="aa-ItemContentBody">
                      <div className="aa-ItemContentTitle">
                        {components.Highlight({
                          hit: item,
                          attribute: 'name',
                        })}{' '}
                        -{' '}
                        <i>
                          {components.Highlight({
                            hit: item,
                            attribute: 'category',
                            tagName: 'strong',
                          })}
                        </i>
                      </div>
                    </div>
                    <div className="aa-ItemActions">
                      <button className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly" type="button" title="Select">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                          <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
                        </svg>
                      </button>
                      <button
                        className="aa-ItemActionButton"
                        type="button"
                        title="Add to cart"
                        onClick={() => handleAddToCart(item, SIZES.S, 1)}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M19 5h-14l1.5-2h11zM21.794 5.392l-2.994-3.992c-0.196-0.261-0.494-0.399-0.8-0.4h-12c-0.326 0-0.616 0.156-0.8 0.4l-2.994 3.992c-0.043 0.056-0.081 0.117-0.111 0.182-0.065 0.137-0.096 0.283-0.095 0.426v14c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h14c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-14c0-0.219-0.071-0.422-0.189-0.585-0.004-0.005-0.007-0.010-0.011-0.015zM4 7h16v13c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-14c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707zM15 10c0 0.829-0.335 1.577-0.879 2.121s-1.292 0.879-2.121 0.879-1.577-0.335-2.121-0.879-0.879-1.292-0.879-2.121c0-0.552-0.448-1-1-1s-1 0.448-1 1c0 1.38 0.561 2.632 1.464 3.536s2.156 1.464 3.536 1.464 2.632-0.561 3.536-1.464 1.464-2.156 1.464-3.536c0-0.552-0.448-1-1-1s-1 0.448-1 1z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            },
          },
        };
      },
    });

    const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
      key: 'RECENT_SEARCH',
      limit: 5,
      transformSource({ source }) {
        return {
          ...source,
          onSelect({ item }) {
            setInstantSearchUiState({
              query: item.label,
            });
            router.replace({ pathname: config.routes.search, query: { keyword: item.label } });
          },
          templates: {
            ...source.templates,
            header({ items }) {
              if (items.length === 0) {
                return <Fragment />;
              }

              return (
                <Fragment>
                  <span className="aa-SourceHeaderTitle">Tìm kiếm gần đây</span>
                  <div className="aa-SourceHeaderLine" />
                </Fragment>
              );
            },
          },
        };
      },
    });

    return [querySuggestionsPlugin, recentSearchesPlugin];
  }, [handleAddToCart, router, searchClient]);

  useEffect(() => {
    if (!autocompleteContainer.current) {
      return;
    }

    const autocompleteInstance = autocomplete({
      ...autocompleteProps,
      container: '#autocomplete',
      initialState: { query: router.query.keyword?.toString() },
      plugins,
      insights: true,
      onReset() {
        setInstantSearchUiState({ query: '' });
      },
      onSubmit({ state }) {
        setInstantSearchUiState({ query: state.query });
        router.replace({ pathname: config.routes.search, query: { keyword: state.query } });
      },
      onStateChange({ prevState, state }) {
        if (prevState.query !== state.query) {
          setInstantSearchUiState({
            query: state.query,
          });
        }
      },
      renderer: { createElement, Fragment, render: render as Render },
    });

    return () => autocompleteInstance.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <div className={className} ref={autocompleteContainer} id="autocomplete" />;
}
