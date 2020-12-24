import React, { FC } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

// 用toolbar替代
interface ISearchFormProps {
    handleSubmitSearch: (data: string) => void
    style: string
}
const SearchForm = (props: ISearchFormProps) => {
    const { handleSubmitSearch } = props;

}
export default SearchForm;

const SearchText: FC<ISearchFormProps> = ( props ) => {
    const { children , ...restProps } = props;
    const handleSubmitSearch = () => {
        return 1;
    }
    return(
        <div>{children}</div>
    )
}

const SearchBar: FC<ISearchFormProps> = ({handleSubmitSearch}) => {
    return(
        <div>Test</div>
    )
}