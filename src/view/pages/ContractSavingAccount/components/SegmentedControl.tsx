

export type IdType = 'cedula' | 'pasaporte';

interface SegmentedControlProps {
  activeTab: IdType;
  onTabChange: (tab: IdType) => void;
}

const SegmentedControl = ({ activeTab, onTabChange }: SegmentedControlProps) => {
  return (
    <div
      data-active-tab={activeTab === 'cedula' ? 1 : 2}
      data-on-background="Variant"
      style={{
        width: '100%',
        padding: 4,
        background: 'var(--Components-Segmented-Controls-segmented-fill-color-on-background-variant-default, #F3F3F3)',
        borderRadius: 32,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 4,
        display: 'inline-flex',
      }}
    >
      <div
        data-active={activeTab === 'cedula' ? 'True' : 'False'}
        data-show-badge="false"
        style={{
          flex: '1 1 0',
          paddingTop: 8,
          paddingBottom: 8,
          background: activeTab === 'cedula' ? 'white' : 'transparent',
          boxShadow: activeTab === 'cedula' ? '0px 2px 4px rgba(0, 0, 0, 0.06)' : 'none',
          borderRadius: 32,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          cursor: 'pointer',
        }}
        onClick={() => onTabChange('cedula')}
      >
        <div
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            color: activeTab === 'cedula' ? '#121212' : '#717171',
            fontSize: 14,
            fontFamily: 'Nunito Sans',
            fontWeight: '700',
            lineHeight: '24px',
            wordWrap: 'break-word',
          }}
        >
          Cédula
        </div>
      </div>

      <div
        data-active={activeTab === 'pasaporte' ? 'True' : 'False'}
        data-show-badge="false"
        style={{
          flex: '1 1 0',
          paddingTop: 8,
          paddingBottom: 8,
          background: activeTab === 'pasaporte' ? 'white' : 'transparent',
          boxShadow: activeTab === 'pasaporte' ? '0px 2px 4px rgba(0, 0, 0, 0.06)' : 'none',
          borderRadius: 32,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          cursor: 'pointer',
        }}
        onClick={() => onTabChange('pasaporte')}
      >
        <div
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            color: activeTab === 'pasaporte' ? '#121212' : '#717171',
            fontSize: 14,
            fontFamily: 'Nunito Sans',
            fontWeight: '700',
            lineHeight: '24px',
            wordWrap: 'break-word',
          }}
        >
          Pasaporte
        </div>
      </div>
    </div>
  );
};

export default SegmentedControl;
