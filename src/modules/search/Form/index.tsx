import { searchClient } from '@/utils/lib/algolia';
import { Autocomplete } from './components/Autocomplete';

function SearchForm() {
  return (
    <div className="mt-3">
      <Autocomplete
        searchClient={searchClient}
        placeholder="Nhập từ khóa tìm kiếm"
        detachedMediaQuery="none"
        openOnFocus
      />
    </div>
  );
}

export default SearchForm;
