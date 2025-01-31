import { styled } from "styled-components";
import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../../redux/api/admin/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../../redux/api/admin/orderApiSlice";
import AdminTopComponent from "../AdminTopComponent";
import OrderList from "../orders/OrderList";
import { AdminWrappr } from "../admin.style";
import { useEffect, useState } from "react";
import { devices } from "../../../../utils/styledConstants";
const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: usersLoading } = useGetUsersQuery();
  const { data: orders, isLoading: ordersLoading } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        thene: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },

    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));
      setState((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },
        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <AdminWrappr>
      <AdminTopComponent />

      <DashboardWrapper>
        <div className="dashboard-container">
          <div className="dashboard-card">
            <div>$</div>
            <p>Sales</p>
            <h3>${isLoading ? "Loading..." : sales.totalSales.toFixed(2)}</h3>
          </div>

          <div className="dashboard-card">
            <div>$</div>
            <p>Customers</p>
            <h3>{usersLoading ? "Loading..." : customers?.users?.length}</h3>
          </div>

          <div className="dashboard-card">
            <div>$</div>
            <p>All Orders</p>
            <h3>{isLoading ? "Loading..." : orders?.totalOrders}</h3>
          </div>
        </div>

        <div className="dashboard-chart">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="90%"
          />
        </div>

        <div>
          <OrderList />
        </div>
      </DashboardWrapper>
    </AdminWrappr>
  );
};

export default AdminDashboard;

const DashboardWrapper = styled.section`
  width: 90%;
  .dashboard-container {
    display: flex;
    justify-content: space-around;

    .dashboard-card {
      background-color: #00000065;
      padding: 1rem 2rem;
      border-radius: 4px;
      width: 22%;

      div {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: var(--primary-clr-pink);
        margin-bottom: 1rem;
      }
    }
  }
  .dashboard-chart {
    margin: 4rem 1rem;
  }

  @media ${devices.md} {
    width: 100%;
    .dashboard-container {
      flex-direction: row;
      justify-content: center;
      gap: 1rem;
      .dashboard-card {
        width: 30%;
      }
    }
  }

  @media ${devices.md} {
    width: 100%;
    .dashboard-container {
      flex-wrap: wrap;
      gap: 1rem;
      .dashboard-card {
        width: 30%;
        min-width: 150px;
      }
    }
  }
`;
