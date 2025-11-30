interface CreateRoomFormProps {
  newRoomName: string;
  onRoomNameChange: (name: string) => void;
  onCreateRoom: () => void;
  isCreating: boolean;
}

const CreateRoomForm = ({
  newRoomName,
  onRoomNameChange,
  onCreateRoom,
  isCreating
}: CreateRoomFormProps) => {
  return (
    <div style={{
      background: '#ffffff',
      padding: '24px',
      borderRadius: '4px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      marginBottom: '32px'
    }}>
      <h3 style={{
        margin: '0 0 16px 0',
        color: '#333',
        fontSize: '16px',
        fontWeight: '600'
      }}>
        Tạo phòng học mới
      </h3>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="Nhập tên phòng học..."
          value={newRoomName}
          onChange={(e) => onRoomNameChange(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !isCreating && newRoomName.trim()) {
              onCreateRoom();
            }
          }}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '14px',
            fontFamily: 'inherit',
            backgroundColor: '#ffffff'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#333';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#ddd';
          }}
        />
        <button
          onClick={onCreateRoom}
          disabled={isCreating || !newRoomName.trim()}
          style={{
            padding: '10px 20px',
            background: isCreating || !newRoomName.trim() ? '#ccc' : '#333',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isCreating || !newRoomName.trim() ? 'not-allowed' : 'pointer',
            fontWeight: '500',
            fontSize: '14px',
            opacity: isCreating || !newRoomName.trim() ? 0.6 : 1
          }}
        >
          {isCreating ? 'Đang tạo...' : 'Tạo'}
        </button>
      </div>
    </div>
  );
};

export default CreateRoomForm;
