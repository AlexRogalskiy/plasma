import {InfoToken, InfoTokenMode, InfoTokenSize, InfoTokenType} from '@coveord/plasma-react';

export default () => (
    <>
        <InfoToken type={InfoTokenType.Critical} size={InfoTokenSize.Small} mode={InfoTokenMode.Filled} />
        <InfoToken type={InfoTokenType.Critical} size={InfoTokenSize.Medium} mode={InfoTokenMode.Filled} />
        <InfoToken type={InfoTokenType.Critical} size={InfoTokenSize.Large} mode={InfoTokenMode.Filled} />
        <InfoToken type={InfoTokenType.Critical} size={InfoTokenSize.Small} mode={InfoTokenMode.Stroked} />
        <InfoToken type={InfoTokenType.Critical} size={InfoTokenSize.Medium} mode={InfoTokenMode.Stroked} />
        <InfoToken type={InfoTokenType.Critical} size={InfoTokenSize.Large} mode={InfoTokenMode.Stroked} />
    </>
);
