import React, { FC, useEffect } from 'react';
import { Card, Row, Col } from 'antd';

interface ICardItem {
    title: React.ReactNode
    value: React.ReactNode
    bordered?: boolean
}
const DataCardItem: FC<ICardItem> = ( props ) => {
    const { title, value, bordered } = props;
    return(
        <div>
            <span>{title}</span>
            <p>{value}</p>
            {bordered && <em />}
        </div>
    )
}

const DataCardGroup: FC<any> = () => {
    return(
        <Card bordered={false}>
        <Row>
          <Col sm={8} xs={24}>
            <DataCardItem title="用户统计" value="8个任务" bordered />
          </Col>
          <Col sm={8} xs={24}>
            <DataCardItem title="产品统计" value="32分钟" bordered />
          </Col>
          <Col sm={8} xs={24}>
            <DataCardItem title="订单统计" value="24个任务" />
          </Col>
        </Row>
      </Card>   
    )
}
export default DataCardGroup;
