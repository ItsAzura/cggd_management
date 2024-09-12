import React from 'react';
import StatCard from './StatCard';
import { useGetCountCustomersQuery } from '../../redux/api/customerSlice';
import {
  useGetTotalAmountQuery,
  useGetCountOrderQuery,
  useGetTotalAmountEveryMonthQuery,
} from '../../redux/api/orderSlice';
import { useGetCountProductQuery } from '../../redux/api/productSlice';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import { MainChar } from './mainChar';
import { TopProducts } from './topProducts';
import { SpiderChart } from './radarChart';
import { CirleChart } from './PieChart';
import { RadiChar } from './radialChart';

const Dashboard = () => {
  const {
    data: customers,
    error: customersError,
    isLoading: customersLoading,
  } = useGetCountCustomersQuery();
  const {
    data: orders,
    error: ordersError,
    isLoading: ordersLoading,
  } = useGetTotalAmountQuery();
  const {
    data: totalOrders,
    error: totalOrdersError,
    isLoading: totalOrdersLoading,
  } = useGetCountOrderQuery();
  const {
    data: products,
    error: productsError,
    isLoading: productsLoading,
  } = useGetCountProductQuery();

  const { data: totalAmountEveryMonth } = useGetTotalAmountEveryMonthQuery();

  if (customersLoading || ordersLoading || totalOrdersLoading)
    return <Loading />;
  if (customersError || ordersError || totalOrdersError) return <Error />;

  return (
    <div className="ml-72">
      <h1 className="text-4xl pt-4 ml-4 font-semibold text-white py-2 filter drop-shadow-[0px_0px_6px_rgba(41,125,204,1)] transition-shadow">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 p-4">
        {customers?.length > 0 && (
          <StatCard
            title="Total Customers"
            value={customers[0].total_customer}
            change="+2.8%"
            changeType="positive"
            description="Compared to last month"
          />
        )}
        {orders?.length > 0 && (
          <StatCard
            title="Total Orders"
            value={`${orders[0].total_sum} VNĐ`}
            change="+12.9%"
            changeType="positive"
            description="Compared to last month"
          />
        )}
        {totalOrders?.length > 0 && (
          <StatCard
            title="Total Orders"
            value={`${totalOrders[0].total_order}`}
            change="+20.2%"
            changeType="positive"
            description="Compared to last month"
          />
        )}
        <StatCard
          title="Total Products"
          value="22"
          change="+20.2%"
          changeType="positive"
          description="Compared to last month"
        />
      </div>
      <div className="flex flex-row my-6">
        <div className="w-3/5 ml-4 ">
          <MainChar chartData={totalAmountEveryMonth} />
        </div>
        <div className="w-2/6 ml-10 ">
          <TopProducts />
        </div>
      </div>
      <div className="flex flex-row my-10 ml-4">
        <div className="w-1/3">
          <SpiderChart />
        </div>
        <div className="w-1/3 ml-4">
          <CirleChart />
        </div>
        <div className="w-1/3 ml-4">
          <RadiChar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
