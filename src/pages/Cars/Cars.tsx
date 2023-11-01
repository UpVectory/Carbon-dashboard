import { useContext } from "react";
import {
  Layout,
  BarChart,
  TreeOffsets,
  Dashboard,
  DashboardTable,
  TableScore,
  TableScoreCaption,
  TableScoreContentTable,
  TableScoreContentTableHead,
  TableScoreContentTableBody,
  DashboardGraph,
  DashboarScoreboard,
} from "../../components/modules";

import {
  CustomButtonSecondary,
  MyGlobalContext,
  TableRowCar,
} from "../../components/base";

import { ReactComponent as RefreshIcon } from "../../assets/refresh-outline_1.svg";

import data from "../../data/cars.json";

export const Cars = () => {
  const {
    length,
    weight,
    carbonCar,
    carsBarChartArr
  } =
  useContext(MyGlobalContext);
  const { cars } = data;

  return (
    <Layout>
      <Dashboard>
        <DashboardTable>
          <TableScore>
            <TableScoreCaption>
              <h2>Fill up your car trips</h2>
              <div>
                <CustomButtonSecondary
                  variant="outlined"
                  onClick={() => {}}
                >
                  <RefreshIcon />
                </CustomButtonSecondary>

              </div>
            </TableScoreCaption>

            <TableScoreContentTable>
              <TableScoreContentTableHead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Fuel Type</th>
                  <th>Distance, {length}</th>
                  <th>Carbon, {weight}</th>
                </tr>
              </TableScoreContentTableHead>

              <TableScoreContentTableBody>
                {cars.map(car => (
                  <TableRowCar
                    key={car.id}
                    item={car}
                  />
                ))}
              </TableScoreContentTableBody>
            </TableScoreContentTable>
          </TableScore>
        </DashboardTable>
        <DashboardGraph>
          <BarChart
            data={carsBarChartArr}
            label={'Your carbon emission per trips by car'}
            customBgActive="#F25F5C"
          />
        </DashboardGraph>
        <DashboarScoreboard>
          <TreeOffsets carbon={carbonCar} />
        </DashboarScoreboard>
      </Dashboard>
    </Layout>
  );
};
