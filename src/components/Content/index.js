import { createWithRemoteLoader } from '@kne/remote-loader';
import ListOptions from './ListOptions';
import { Flex } from 'antd';
import style from './style.module.scss';

const Content = createWithRemoteLoader({
  modules: ['components-core:Table@TablePage', 'components-core:Filter']
})(({ remoteModules, apis, groupCode, objectCode, plugins = {} }) => {
  const [TablePage, Filter] = remoteModules;
  const { getFilterValue } = Filter;
  return (
    <ListOptions apis={apis} groupCode={groupCode} objectCode={objectCode} plugins={plugins} topOptionsSize="small">
      {({ ref, filter, topOptions, columns, optionsColumn }) => {
        return (
          <Flex vertical gap={8} flex={1}>
            {filter.list && filter.list.length > 0 ? (
              <Filter {...filter} extra={topOptions} className={style['page-filter']} />
            ) : (
              <Flex justify="space-between">
                <div></div>
                {topOptions}
              </Flex>
            )}
            <TablePage
              {...Object.assign({}, apis.content.getList, {
                params: Object.assign({}, { objectCode, groupCode }, { filter: getFilterValue(filter.value) })
              })}
              columns={[...columns, optionsColumn]}
              ref={ref}
              name="cms-field-content"
              pagination={{ paramsType: 'params' }}
            />
          </Flex>
        );
      }}
    </ListOptions>
  );
});

export default Content;
export { ListOptions };
