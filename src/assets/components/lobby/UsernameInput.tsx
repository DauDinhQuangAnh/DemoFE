interface UsernameInputProps {
  username: string;
  onUsernameChange: (username: string) => void;
}

const UsernameInput = ({ username, onUsernameChange }: UsernameInputProps) => {
  return (
    <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <label style={{
        display: 'block',
        fontSize: '13px',
        fontWeight: '500',
        color: '#666',
        marginBottom: '8px'
      }}>
        Tên hiển thị của bạn
      </label>
      <input
        type="text"
        placeholder="Nhập tên của bạn..."
        value={username}
        onChange={(e) => onUsernameChange(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '4px',
          border: '1px solid #ddd',
          fontSize: '15px',
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
    </div>
  );
};

export default UsernameInput;
