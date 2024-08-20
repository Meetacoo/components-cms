import { createWithRemoteLoader } from '@kne/remote-loader';
import ListOptions from './ListOptions';
import getColumns from './getColumns';
import { Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

const Field = createWithRemoteLoader({
  modules: ['components-core:Table@TablePage', 'components-core:Global@usePreset']
})(({ remoteModules, groupCode, objectCode, plugins = {}, baseUrl = '' }) => {
  const [TablePage, usePreset] = remoteModules;
  const { apis } = usePreset();
  const navigate = useNavigate();
  return (
    <ListOptions apis={apis.cms} groupCode={groupCode} objectCode={objectCode} plugins={plugins} topOptionsSize="small">
      {({ ref, topOptions, optionsColumn }) => (
        <Flex vertical gap={8} flex={1}>
          <Flex justify="space-between">
            <div></div>
            {topOptions}
          </Flex>
          <TablePage
            {...Object.assign({}, apis.cms.field.getList, {
              params: { objectCode, groupCode }
            })}
            ref={ref}
            name="cms-field"
            pagination={{ open: false }}
            dataFormat={data => {
              return { list: data };
            }}
            columns={[
              ...getColumns({
                navigateTo: item => {
                  navigate(`${baseUrl}/object-detail?group=${groupCode}&object=${item.referenceObject.code}`);
                }
              }),
              optionsColumn
            ]}
          />
        </Flex>
      )}
    </ListOptions>
  );
});

export default Field;

export { ListOptions, getColumns };
export { default as FormInner } from './FormInner';
