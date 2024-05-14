import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';

const TableExpandIcon = ({ expanded, onExpand, record }: any) => {
  const handleClick: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    e.stopPropagation();
    onExpand(record, e);
  };
  return record.children && record.children.length > 0 ? (
    <span style={{ marginRight: '4px' }}>
      {expanded ? (
        <MinusSquareOutlined onClick={handleClick} />
      ) : (
        <PlusSquareOutlined onClick={handleClick} />
      )}
    </span>
  ) : null;
};
export default TableExpandIcon;
