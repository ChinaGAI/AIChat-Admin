import { Col, Row } from 'antd';
import AnalysisRegister from './AnalysisRegister';
import AnalysisVisit from './AnalysisVisit';
import AnalysisLogin from './AnalysisLogin';
import AnalysisLike from './AnalysisLike';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};

const IntroduceRow = () => {
  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <AnalysisRegister />
      </Col>

      <Col {...topColResponsiveProps}>
        <AnalysisVisit />
      </Col>
      <Col {...topColResponsiveProps}>
        <AnalysisLogin />
      </Col>
      <Col {...topColResponsiveProps}>
        <AnalysisLike />
      </Col>
    </Row>
  );
};
export default IntroduceRow;
