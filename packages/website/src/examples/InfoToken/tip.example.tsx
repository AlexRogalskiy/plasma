import {InfoToken, InfoTokenMode, InfoTokenSize, InfoTokenType} from '@coveord/plasma-react';

export default () => (
    <>
        <InfoToken type={InfoTokenType.Tip} size={InfoTokenSize.Small} mode={InfoTokenMode.Filled} />
        <InfoToken type={InfoTokenType.Tip} size={InfoTokenSize.Medium} mode={InfoTokenMode.Filled} />
        <InfoToken type={InfoTokenType.Tip} size={InfoTokenSize.Large} mode={InfoTokenMode.Filled} />
        <InfoToken type={InfoTokenType.Tip} size={InfoTokenSize.Small} mode={InfoTokenMode.Stroked} />
        <InfoToken type={InfoTokenType.Tip} size={InfoTokenSize.Medium} mode={InfoTokenMode.Stroked} />
        <InfoToken type={InfoTokenType.Tip} size={InfoTokenSize.Large} mode={InfoTokenMode.Stroked} />
    </>
);
