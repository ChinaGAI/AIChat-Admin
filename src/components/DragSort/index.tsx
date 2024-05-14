import { DragDropContext, Droppable, Draggable, OnDragEndResponder } from 'react-beautiful-dnd';
import { ReactNode } from 'react';

interface DragSortProps<T> {
  data: T[];
  onDragSort: (newData: T[]) => void;
  renderItem: (item: T, dragHandleProps: any) => ReactNode;
  keyExtractor: (item: T) => string;
}

const DragSort = <T extends Record<any, any>>({
  data,
  onDragSort,
  renderItem,
  keyExtractor,
}: DragSortProps<T>) => {
  const handleOnDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) return;
    const items = [...data];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    onDragSort(items);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="items">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {data.map((item, index) => (
              <Draggable key={keyExtractor(item)} draggableId={keyExtractor(item)} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    {renderItem(item, provided.dragHandleProps)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragSort;
