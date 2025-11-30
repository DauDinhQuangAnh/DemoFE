interface Room {
  _id: string;
  name: string;
  description: string;
}

interface RoomCardProps {
  room: Room;
  onJoin: (roomName: string) => void;
}

const RoomCard = ({ room, onJoin }: RoomCardProps) => {
  return (
    <div
      onClick={() => onJoin(room.name)}
      style={{
        background: '#ffffff',
        padding: '20px',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        border: '1px solid #e5e5e5',
        transition: 'border-color 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#333';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#e5e5e5';
      }}
    >
      <h4 style={{
        margin: '0 0 8px 0',
        color: '#333',
        fontSize: '16px',
        fontWeight: '600'
      }}>
        {room.name}
      </h4>
      <p style={{
        fontSize: '13px',
        color: '#666',
        margin: '0 0 12px 0',
        lineHeight: '1.5'
      }}>
        {room.description}
      </p>
      <button style={{
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #333',
        background: 'white',
        color: '#333',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '13px',
        transition: 'all 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#333';
        e.currentTarget.style.color = 'white';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'white';
        e.currentTarget.style.color = '#333';
      }}
      >
        Tham gia
      </button>
    </div>
  );
};

export default RoomCard;
