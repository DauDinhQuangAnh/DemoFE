import { useState, type CSSProperties, type FormEvent } from 'react';

type AuthMode = 'login' | 'register';

interface AuthPageProps {
  API_URL: string;
  onSuccess: (payload: { token: string; user: AuthUser }) => void;
}

export interface AuthUser {
  id: string;
  username: string;
  fullName: string;
  email: string;
  avatar?: string;
  bio?: string;
  socialLinks?: string[];
}

interface ErrorResponse {
  error?: string;
  message?: string;
}

const initialRegisterForm = {
  username: '',
  fullName: '',
  email: '',
  password: '',
};

const initialLoginForm = {
  identifier: '',
  password: '',
};

const AuthPage = ({ API_URL, onSuccess }: AuthPageProps) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const switchMode = (nextMode: AuthMode, options?: { preserveFeedback?: boolean }) => {
    setMode(nextMode);
    if (!options?.preserveFeedback) {
      setFeedback(null);
    }
  };

  const handleRegisterChange = (field: keyof typeof initialRegisterForm, value: string) => {
    setRegisterForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLoginChange = (field: keyof typeof initialLoginForm, value: string) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
  };

  const parseError = async (res: Response) => {
    try {
      const data: ErrorResponse = await res.json();
      return data.error || data.message || 'Đã xảy ra lỗi.';
    } catch {
      return 'Đã xảy ra lỗi.';
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    try {
      let endpoint = `${API_URL}/auth/login`;
      let body: Record<string, string> = {};

      if (mode === 'register') {
        endpoint = `${API_URL}/auth/register`;
        const fullName = registerForm.fullName.trim();
        body = {
          username: registerForm.username.trim(),
          email: registerForm.email.trim(),
          password: registerForm.password,
          ...(fullName ? { fullName } : {}),
        };
      } else {
        body = {
          username: loginForm.identifier.trim(),
          password: loginForm.password,
        };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const message = await parseError(res);
        setFeedback({ type: 'error', text: message });
        return;
      }

      const data = await res.json();

      if (mode === 'register') {
        setFeedback({ type: 'success', text: data?.message || 'Đăng ký thành công. Bạn có thể đăng nhập!' });
        setRegisterForm(initialRegisterForm);
        switchMode('login', { preserveFeedback: true });
        return;
      }

      onSuccess({
        token: data.token,
        user: data.user,
      });
    } catch (error) {
      console.error('[AuthPage] Submit error', error);
      setFeedback({ type: 'error', text: 'Không thể kết nối đến server.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        background: 'radial-gradient(circle at top, #e0e7ff, #f8fafc)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          borderRadius: '24px',
          boxShadow: '0 40px 80px rgba(15, 23, 42, 0.15)',
          background: '#fff',
          padding: '32px',
        }}
      >
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <p
            style={{
              display: 'inline-flex',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 600,
              background: 'rgba(59, 130, 246, 0.1)',
              color: '#2563eb',
              marginBottom: '16px',
            }}
          >
            {mode === 'login' ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}
          </p>
          <h1
            style={{
              margin: 0,
              fontSize: '26px',
              color: '#0f172a',
            }}
          >
            Study With Me
          </h1>
          <p style={{ margin: '8px 0 0', color: '#64748b', fontSize: '14px' }}>
            {mode === 'login'
              ? 'Đăng nhập để tham gia cộng đồng học cùng nhau.'
              : 'Mất 1 phút để hòa mình vào không khí học tập.'}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '8px',
            padding: '4px',
            borderRadius: '16px',
            background: 'rgba(226, 232, 240, 0.6)',
            marginBottom: '24px',
          }}
        >
          <button
            type="button"
            onClick={() => switchMode('login')}
            style={{
              borderRadius: '12px',
              padding: '10px 0',
              fontWeight: 600,
              background: mode === 'login' ? '#fff' : 'transparent',
              border: mode === 'login' ? '1px solid rgba(59, 130, 246, 0.25)' : 'none',
              color: mode === 'login' ? '#2563eb' : '#475569',
              boxShadow: mode === 'login' ? '0 10px 25px rgba(59, 130, 246, 0.15)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => switchMode('register')}
            style={{
              borderRadius: '12px',
              padding: '10px 0',
              fontWeight: 600,
              background: mode === 'register' ? '#fff' : 'transparent',
              border: mode === 'register' ? '1px solid rgba(59, 130, 246, 0.25)' : 'none',
              color: mode === 'register' ? '#2563eb' : '#475569',
              boxShadow: mode === 'register' ? '0 10px 25px rgba(59, 130, 246, 0.15)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            Đăng ký
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {mode === 'register' ? (
            <>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Tên đăng nhập</span>
                <input
                  required
                  type="text"
                  value={registerForm.username}
                  onChange={(e) => handleRegisterChange('username', e.target.value)}
                  placeholder="vd. superstudent"
                  style={inputStyle}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Tên hiển thị</span>
                <input
                  type="text"
                  value={registerForm.fullName}
                  onChange={(e) => handleRegisterChange('fullName', e.target.value)}
                  placeholder="vd. Nguyễn Văn A"
                  style={inputStyle}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Email</span>
                <input
                  required
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => handleRegisterChange('email', e.target.value)}
                  placeholder="you@example.com"
                  style={inputStyle}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Mật khẩu</span>
                <input
                  required
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => handleRegisterChange('password', e.target.value)}
                  placeholder="Ít nhất 6 ký tự"
                  style={inputStyle}
                />
              </label>
            </>
          ) : (
            <>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Tên đăng nhập hoặc Email</span>
                <input
                  required
                  type="text"
                  value={loginForm.identifier}
                  onChange={(e) => handleLoginChange('identifier', e.target.value)}
                  placeholder="Nhập username hoặc email"
                  style={inputStyle}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Mật khẩu</span>
                <input
                  required
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => handleLoginChange('password', e.target.value)}
                  placeholder="••••••••"
                  style={inputStyle}
                />
              </label>
            </>
          )}

          {feedback && (
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '14px',
                color: feedback.type === 'success' ? '#15803d' : '#b91c1c',
                background: feedback.type === 'success' ? 'rgba(34,197,94,0.12)' : 'rgba(248,113,113,0.15)',
                border: `1px solid ${
                  feedback.type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(248,113,113,0.3)'
                }`,
              }}
            >
              {feedback.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: '12px',
              borderRadius: '16px',
              background:
                'linear-gradient(135deg, rgba(59,130,246,1) 0%, rgba(99,102,241,1) 100%)',
              color: '#fff',
              padding: '14px 16px',
              fontWeight: 600,
              fontSize: '16px',
              border: 'none',
              boxShadow: '0 20px 40px rgba(59,130,246,0.25)',
            }}
          >
            {isSubmitting ? 'Đang xử lý...' : mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle: CSSProperties = {
  borderRadius: '12px',
  border: '1px solid rgba(226, 232, 240, 1)',
  padding: '12px 14px',
  fontSize: '14px',
  transition: 'all 0.2s ease',
};

export default AuthPage;

