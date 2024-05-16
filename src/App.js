import { useForm } from 'react-hook-form';
import './App.css';
function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors, isSubmitted },
  } = useForm();

  // register : input을 등록하는 함수
  // watch : 등록한 input을 확인하는 함수
  // handleSubmit : 입력한 form을 제출할때 사용하는 함수

  // noValidate : html에서 제공하는 기본적인 유효성 검증하는 기능을 끔(중복 submit 방지)

  // isSubmitting : 현재 양식이 제출중인 상황인지 아닌지 구별하는 변수
  // errors : 양식의 에러상태를 나타내는 변수

  // ***input 내부에 넣는 속성***
  // required : 필수 입력 지정 속성
  // pattern : 인풋의 패턴(값의 형식, 에러메시지)
  // aria-invalid : input 태그의 초록색/빨간색(유효/비유효) 처리

  console.log(watch('email'));

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (data) => {
        await new Promise((r) => setTimeout(r, 1000));
        alert(JSON.stringify(data));
      })}
    >
      <label>Email</label>
      <input
        id="email"
        name="email"
        defaultValue="email"
        {...register('email', {
          required: '이메일은 필수 입력입니다.',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: '이메일 형식에 맞지 않습니다.',
          },
        })}
        aria-invalid={
          isSubmitted ? (errors.email ? 'true' : 'false') : undefined
        }
      />
      {errors.email && (
        <small role="alert" style={{ color: 'red' }}>
          {errors.email.message}
        </small>
      )}

      <label>Password</label>
      <input
        id="password"
        name="password"
        type="password"
        {...register('password', {
          required: '비밀번호는 필수 입력입니다.',
          minLength: {
            value: 8,
            message: '8자리 이상 비밀번호를 사용하세요.',
          },
        })}
        aria-invalid={
          isSubmitted ? (errors.password ? 'true' : 'false') : undefined
        }
      />
      {errors.password && (
        <small role="alert" style={{ color: 'red' }}>
          {errors.password.message}
        </small>
      )}

      <button type="submit" disabled={isSubmitting}>
        로그인
      </button>
    </form>
  );
}

export default App;
