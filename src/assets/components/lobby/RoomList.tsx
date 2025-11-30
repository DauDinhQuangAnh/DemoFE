import RoomCard from './RoomCard';

interface Room {
  _id: string;
  name: string;
  description: string;
}

interface RoomListProps {
  rooms: Room[];
  onJoinRoom: (roomName: string) => void;
}

const RoomList = ({ rooms, onJoinRoom }: RoomListProps) => {
  if (rooms.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        background: '#ffffff',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>📚</div>
        <h3 style={{
          margin: '0 0 8px 0',
          color: '#333',
          fontSize: '16px',
          fontWeight: '600'
        }}>
          Chưa có phòng nào
        </h3>
        <p style={{
          margin: 0,
          color: '#666',
          fontSize: '14px'
        }}>
          Hãy tạo phòng học đầu tiên để bắt đầu!
        </p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '16px'
    }}>
      {rooms.map((room) => (
        <RoomCard
          key={room._id}
          room={room}
          onJoin={onJoinRoom}
        />
      ))}
    </div>
  );
};

export default RoomList;
