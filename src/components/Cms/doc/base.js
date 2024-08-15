const { default: Cms } = _Cms;
const { createWithRemoteLoader } = remoteLoader;
const { getApis } = _Apis;
const { merge } = lodash;
const { Routes, Route, Navigate } = reactRouter;

const BaseExample = createWithRemoteLoader({
  modules: ['Global@PureGlobal', 'Global@usePreset', 'Layout']
})(({ remoteModules }) => {
  const [PureGlobal, usePreset, Layout] = remoteModules;
  const preset = usePreset();
  return (
    <PureGlobal
      preset={merge({}, preset, {
        apis: {
          cms: getApis()
        }
      })}
    >
      <Layout navigation={{ isFixed: false }}>
        <Routes>
          <Route path="/Cms/*" element={<Cms baseUrl="/Cms" />} />
          <Route path="*" element={<Navigate to="/Cms" />} />
        </Routes>
      </Layout>
    </PureGlobal>
  );
});

render(<BaseExample />);
