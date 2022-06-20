import * as React from 'react';
import { Divider, Loader } from 'semantic-ui-react';

import Filters from './Filters';
import MealList from './MealList';
import ChartToggler from './ChartToggler';


import { FILTER_OPTIONS } from '../commons/const';
import * as utils from '../commons/utils';
import { response } from 'msw';
import { useQuery } from 'react-query';
import axios from 'axios';

const RatingChart = React.lazy(() => import('./RatingChart'));

const useToggler = (initialState=false) => {
  const [isChartVisible, setIsChartVisible] = React.useState(initialState);
  const onChange = React.useCallback(
    () => setIsChartVisible((state) => !state),
  [])

  return [isChartVisible, onChange];
}

const SelectMeal = (props) => {
  // const [data, setData] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(false);
  // const chartData = utils.prepareChartData(data);
  const [isChartVisible, setIsChartVisible] = React.useState(false);
  const [filters, setFilters] = React.useState({});

  // React.useEffect(() => {
  //   setIsLoading(true);
  //   fetch('/data.json', {
  //     method: 'GET'
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     setIsLoading(false);
  //     setData(data)
  //   })
  // }, []);

  const {isLoading, data=[], } = useQuery(
    'meals-list', 
    () => axios('/data.json').then(({ data }) => data),
    {refetchOnWindowFocus: false}
  )

  const [isPending, startTransition] = React.useTransition();
  const onChangeFilter = React.useCallback(
    (value, checked) => {
      startTransition(
        setFilters(state => ({
          ...state,
          [value]: checked
        }))
      )
    }
  )

  const filteredData = utils.applyFilter(filters, data);

  return (
    <React.Fragment>
      <ChartToggler isVisible={isChartVisible} onChange={ () => setIsChartVisible((state) => !state) }/>
      <React.Suspense fallback={<Loader active inline='centered'></Loader>}>
      {isChartVisible && (
        <React.Fragment>
          <Divider hidden />
          <RatingChart data={filteredData} />
        </React.Fragment>
      )}
      </React.Suspense>
      <Divider />
      <Filters options={FILTER_OPTIONS} onChange={onChangeFilter}/>
      <Divider />
      {isLoading ? <Loader inline></Loader> : <MealList meals={filteredData}/>}
      <Divider hidden></Divider>
    </React.Fragment>
  );
};

export default SelectMeal;
