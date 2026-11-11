import s from './Modal.module.css';
export function ModalText({value, onSignUp, onLogin,handleToggle }) {
    
    return (
      <>
        {value === 'signUp' ? (
          <div className={s.modal} onClick={(e)=> e.stopPropagation()}>
            <h1 className={s.title}>Sign Up</h1>
            <form className={s.form} onSubmit={onSignUp}>
              <label htmlFor="username" className={s.label}>
                Username
              </label>
              <input
                type="text"
                name="username"
                className={s.input}
                placeholder="Username"
                required
              />

              <label htmlFor="email" className={s.label}>
                E-Mail
              </label>
              <input
                type="email"
                name="email"
                className={s.input}
                placeholder="E-Mail"
                required
              />

              <label htmlFor="password" className={s.label}>
                Password
              </label>
              <input
                type="password"
                name="password"
                className={s.input}
                placeholder="Password"
                required
              />
              <button className={s.btn}>Sign Up</button>
              <p className={s.text}>
                Already have an account?{' '}
                <span>
                  <button
                    onClick={() => handleToggle('login')}
                    className={s.link}
                  >
                    Sign In
                  </button>
                </span>
              </p>
            </form>
          </div>
        ) : (
          <div className={s.modalLogin} onClick={(e)=> e.stopPropagation()}>
            <h1 className={s.title}>Sign In</h1>
            <form className={s.form} onSubmit={onLogin}>
              <label htmlFor="email" className={s.label}>
                E-Mail
              </label>
              <input
                type="email"
                name="email"
                className={s.input}
                placeholder="E-Mail"
                required
              />

              <label htmlFor="password" className={s.label}>
                Password
              </label>
              <input
                type="password"
                name="password"
                className={s.input}
                placeholder="Password"
                required
              />
              <button className={s.btn}>Login</button>
              <p className={s.text}>
                Don't have an account?{' '}
                <span>
                  <button
                    onClick={() => handleToggle('signUp')}
                    className={s.link}
                  >
                    Sign Up
                  </button>
                </span>
              </p>
            </form>
          </div>
        )}
      </>
    );
}