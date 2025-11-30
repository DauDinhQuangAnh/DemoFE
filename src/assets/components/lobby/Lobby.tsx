import { useState, useEffect } from 'react';
import UsernameInput from './UsernameInput';
import CreateRoomForm from './CreateRoomForm';
import RoomList from './RoomList';

interface Room {
  _id: string;
  name: string;
  description: string;
}

interface LobbyProps {
  API_URL: string;
  username: string;
  onUsernameChange: (username: string) => void;
  onJoinRoom: (roomName: string) => void;
  authToken: string | null;
  user: {
    id: string;
    username: string;
    fullName: string;
    email: string;
    avatar?: string;
  };
  onLogout: () => void;
}

const Lobby = ({
  API_URL,
  username,
  onUsernameChange,
  onJoinRoom,
  authToken,
  user,
  onLogout,
}: LobbyProps) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [newRoomName, setNewRoomName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await fetch(`${API_URL}/rooms`, {
        headers: authToken
          ? {
              Authorization: `Bearer ${authToken}`,
            }
          : undefined,
      });
      const data = await res.json();
      setRooms(data);
    } catch (error) {
      console.error('Lỗi lấy danh sách phòng:', error);
    }
  };

  const createRoom = async () => {
    if (!newRoomName.trim()) {
      alert('Vui lòng nhập tên phòng!');
      return;
    }
    setIsCreating(true);
    try {
      const res = await fetch(`${API_URL}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken
            ? {
                Authorization: `Bearer ${authToken}`,
              }
            : {}),
        },
        body: JSON.stringify({ 
          name: newRoomName, 
          description: 'Phòng học tập cùng nhau' 
        }),
      });

      if (res.ok) {
        setNewRoomName('');
        fetchRooms();
      } else {
        alert('Tên phòng bị trùng hoặc có lỗi xảy ra!');
      }
    } catch (e) {
      alert('Lỗi kết nối server');
    }
    setIsCreating(false);
  };

  const handleJoinRoom = (roomName: string) => {
    if (!username.trim()) {
      alert('Vui lòng nhập tên bạn trước khi tham gia phòng!');
      return;
    }
    onJoinRoom(roomName);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f5f5f5',
        padding: '40px 20px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {/* Account bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            padding: '16px 20px',
            borderRadius: '16px',
            background: 'white',
            boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #5B8DEF, #8F6AFF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 600,
                fontSize: '18px',
                overflow: 'hidden',
              }}
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.fullName || user.username}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                user.fullName?.[0]?.toUpperCase() || user.username[0].toUpperCase()
              )}
            </div>
            <div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#0f172a',
                }}
              >
                {user.fullName || user.username}
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: '#64748b',
                }}
              >
                {user.email}
              </div>
            </div>
          </div>
          <button
            onClick={onLogout}
            style={{
              borderRadius: '999px',
              border: '1px solid rgba(15, 23, 42, 0.1)',
              padding: '10px 20px',
              background: '#fff',
              fontWeight: 500,
              color: '#0f172a',
            }}
          >
            Đăng xuất
          </button>
        </div>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{
            margin: '0 0 8px 0',
            fontSize: '32px',
            fontWeight: '600',
            color: '#333'
          }}>
            Study With Me
          </h1>
          <p style={{
            margin: 0,
            fontSize: '14px',
            color: '#666'
          }}>
            Học tập cùng nhau, hiệu quả hơn
          </p>
        </div>

        {/* Username Input */}
        <div style={{ marginBottom: '32px' }}>
          <UsernameInput 
            username={username}
            onUsernameChange={onUsernameChange}
          />
        </div>

        {/* Create Room Form */}
        <div style={{ maxWidth: '700px', margin: '0 auto 40px' }}>
          <CreateRoomForm
            newRoomName={newRoomName}
            onRoomNameChange={setNewRoomName}
            onCreateRoom={createRoom}
            isCreating={isCreating}
          />
        </div>

        {/* Room List */}
        <div>
          <h2 style={{
            margin: '0 0 20px 0',
            color: '#333',
            fontSize: '18px',
            fontWeight: '600',
            textAlign: 'center'
          }}>
            Các phòng đang hoạt động
          </h2>
          <RoomList 
            rooms={rooms}
            onJoinRoom={handleJoinRoom}
          />
        </div>
      </div>
    </div>
  );
};

export default Lobby;
