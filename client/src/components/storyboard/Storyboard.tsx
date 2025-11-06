import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Image from 'next/image';

interface StoryboardScene {
  id: string;
  scene: string;
  visualDescription: string;
  imageUrl?: string;
}

interface StoryboardProps {
  scenes: StoryboardScene[];
  onSceneReorder: (result: any) => void;
}

export function Storyboard({ scenes, onSceneReorder }: StoryboardProps) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    onSceneReorder(result);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="scenes">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {scenes.map((scene, index) => (
              <Draggable key={scene.id} draggableId={scene.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="relative overflow-hidden rounded-lg bg-white shadow"
                  >
                    {scene.imageUrl ? (
                      <div className="aspect-[16/9] w-full bg-gray-100">
                        <Image
                          src={scene.imageUrl}
                          alt={scene.scene}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] w-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">No image generated</span>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Scene {index + 1}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {scene.scene}
                      </p>
                      <p className="mt-2 text-sm text-gray-700">
                        {scene.visualDescription}
                      </p>
                    </div>
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
}
