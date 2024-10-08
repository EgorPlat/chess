import { useEffect, useState } from 'react';
import './App.css';
import ChessDesk from './components/ChessDesk';
import ChessHistory from './components/ChessHistory';
import { useAddUserMutation, useGetUsersQuery } from './store/api';
import CustomModal from './components-ui/CustomModal/CustomModal';

function App() {

  const { data, isLoading, error } = useGetUsersQuery({ userId: 1 });
  const [addNewUser, { isError }] = useAddUserMutation();
  const [isInithialMessageOpened, setIsInithialMessageOpened] = useState<boolean>(true);

  return (
    <div className="chess">
      <ChessDesk />
      <ChessHistory />
      <CustomModal 
        isDisplay={isInithialMessageOpened}
        title="Уведомление"
        actionConfirmed={() => setIsInithialMessageOpened(false)}
        changeModal={() => setIsInithialMessageOpened(false)}
        typeOfActions="default"
      >
        Это приложение, позволяющее играть в шахматы с друзьями на одном устройстве. 
        Совсем скоро будет возможность играть по сети.
      </CustomModal>
    </div>
  );
}

export default App;
