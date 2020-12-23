import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

// 用toolbar替代
interface ISearchFormProps {
    handleSubmitSearch: (data: any) => void
}
const SearchForm = (props: ISearchFormProps) => {
    const { handleSubmitSearch } = props;

}
export default SearchForm;