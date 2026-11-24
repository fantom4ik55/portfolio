import { useState, useRef, useEffect } from 'react';

const PHONE_ERROR = 'Введите полный номер: +7 (999) 999-99-99';
const EMAIL_ERROR = 'Введите корректный email (например, mail@example.com)';
const NAME_ERROR = 'Имя должно содержать минимум 2 символа';
const CONSENT_ERROR = 'Необходимо согласие на обработку данных';

function formatPhone(value) {
  let digits = value.replace(/\D/g, '');
  if (digits.startsWith('8')) digits = '7' + digits.slice(1);
  if (digits.startsWith('9')) digits = '7' + digits;
  if (digits && !digits.startsWith('7')) digits = '7' + digits;
  digits = digits.slice(0, 11);
  if (!digits) return '';

  let result = '+7';
  if (digits.length > 1) result += ' (' + digits.slice(1, Math.min(4, digits.length));
  if (digits.length >= 4) result += ') ' + digits.slice(4, Math.min(7, digits.length));
  if (digits.length >= 7) result += '-' + digits.slice(7, Math.min(9, digits.length));
  if (digits.length >= 9) result += '-' + digits.slice(9, Math.min(11, digits.length));
  return result;
}

const countDigits = (str) => str.replace(/\D/g, '').length;

function getCaretFromDigits(str, digitCount) {
  if (digitCount === 0) return str.length;
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (/\d/.test(str[i])) count++;
    if (count === digitCount) return i + 1;
  }
  return str.length;
}

function Forma() {
  const [values, setValues] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    consent: false,
  });
  
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    consent: '',
  });

  const [status, setStatus] = useState({ text: '', type: '' }); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef(null);
  const phoneRef = useRef(null);
  const caretPosRef = useRef(null);
  const statusTimerRef = useRef(null);

  const validateField = (name, value) => {
    let error = '';
    if (name === 'name') {
      if (value.trim().length > 0 && value.trim().length < 2) error = NAME_ERROR;
    }
    if (name === 'phone') {
      const digits = countDigits(value);
      if (digits > 1 && digits < 11) error = PHONE_ERROR;
    }
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value.length > 0 && !emailRegex.test(value)) error = EMAIL_ERROR;
    }
    if (name === 'consent') {
      if (!value) error = CONSENT_ERROR;
    }
    return error;
  };

  useEffect(() => {
    if (!phoneRef.current) return;
    const digits = countDigits(values.phone);
    if (digits > 1 && digits < 11) {
      phoneRef.current.setCustomValidity(PHONE_ERROR);
    } else {
      phoneRef.current.setCustomValidity('');
    }
  }, [values.phone]);

  useEffect(() => {
    if (caretPosRef.current != null && phoneRef.current) {
      phoneRef.current.setSelectionRange(caretPosRef.current, caretPosRef.current);
      caretPosRef.current = null;
    }
  }, [values.phone]);

  useEffect(() => () => clearTimeout(statusTimerRef.current), []);

  const setField = (name, value) => setValues((v) => ({ ...v, [name]: value }));
  const isFilled = (name) => values[name].trim() !== '';

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setField(name, checked);
    if (checked) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  function handlePhoneChange(e) {
    const input = e.target;
    const cursorPos = input.selectionStart;
    const digitsBefore = countDigits(input.value.slice(0, cursorPos));
    const formatted = formatPhone(input.value);

    caretPosRef.current = getCaretFromDigits(formatted, digitsBefore);
    setField('phone', formatted);

    if (errors.phone && countDigits(formatted) === 11) {
       setErrors((prev) => ({ ...prev, phone: '' }));
    }
  }

  function handlePhoneFocus() {
    if (!values.phone) {
      caretPosRef.current = 4; 
      setField('phone', '+7 (');
    }
  }

  function handlePhoneBlur(e) {
    const digits = countDigits(values.phone);
    if (digits <= 1) {
      setField('phone', '');
    }
    handleBlur(e);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {
      name: validateField('name', values.name),
      phone: validateField('phone', values.phone),
      email: validateField('email', values.email),
      message: '',
      consent: validateField('consent', values.consent),
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err !== '');
    
    if (hasErrors || (formRef.current && !formRef.current.checkValidity())) {
      formRef.current.reportValidity();
      return;
    }

    setIsSubmitting(true);
    setStatus({ text: '', type: '' });

    const payload = {
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim().toLowerCase(),
      message: values.message.trim(),
      consent: values.consent ? 'Да' : 'Нет',
    };

    try {
      const response = await fetch(formRef.current.action, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ text: '✓ Сообщение отправлено! Я свяжусь с вами скоро.', type: 'success' });
        formRef.current.reset();
        setValues({ name: '', phone: '', email: '', message: '', consent: false });
        setErrors({ name: '', phone: '', email: '', message: '', consent: '' });
        if (phoneRef.current) phoneRef.current.setCustomValidity('');

        clearTimeout(statusTimerRef.current);
        statusTimerRef.current = setTimeout(() => {
          setStatus({ text: '', type: '' });
        }, 5000);
      } else {
        console.error('Formspree Error:', data);
        const errorMsg = data.errors ? data.errors.map(err => err.message).join(', ') : 'Ошибка отправки. Попробуйте позже.';
        setStatus({ text: errorMsg, type: 'error' });
      }
    } catch (err) {
      console.error('Network Error:', err);
      setStatus({ text: 'Ошибка сети. Проверьте подключение.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
         
        <div className="contact__intro">
          <h2 className="contact__intro-title">Есть идея?<br />Давайте сделаем.</h2>
          <p className="contact__intro-text">
            Проектная работа, постоянное сотрудничество
          </p>
        </div>
         
        <form 
          ref={formRef} 
          className="contact__form" 
          action="https://formspree.io/f/xrpponvw" 
          method="POST" 
          onSubmit={handleSubmit}
        >
          <div className={`contact__form-group${isFilled('name') ? ' contact__form-group--filled' : ''}${errors.name ? ' contact__form-group--error' : ''}`}>
            <input
              className="contact__input"
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              required
              value={values.name}
              onChange={(e) => setField('name', e.target.value)}
              onBlur={handleBlur}
            />
            <label className="contact__label" htmlFor="name">Имя</label>
            {errors.name && <span className="contact__error-text">{errors.name}</span>}
          </div>

          <div className={`contact__form-group${isFilled('phone') ? ' contact__form-group--filled' : ''}${errors.phone ? ' contact__form-group--error' : ''}`}>
            <input
              ref={phoneRef}
              className="contact__input"
              type="tel"
              id="phone"
              name="phone"
              required
              value={values.phone}
              onChange={handlePhoneChange}
              onFocus={handlePhoneFocus}
              onBlur={handlePhoneBlur}
            />
            <label className="contact__label" htmlFor="phone">Телефон</label>
            {errors.phone && <span className="contact__error-text">{errors.phone}</span>}
          </div>

          <div className={`contact__form-group${isFilled('email') ? ' contact__form-group--filled' : ''}${errors.email ? ' contact__form-group--error' : ''}`}>
            <input
              className="contact__input"
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={(e) => setField('email', e.target.value)}
              onBlur={handleBlur}
            />
            <label className="contact__label" htmlFor="email">Email</label>
            {errors.email && <span className="contact__error-text">{errors.email}</span>}
          </div>

          <div className={`contact__form-group${isFilled('message') ? ' contact__form-group--filled' : ''}`}>
            <textarea
              className="contact__textarea"
              id="message"
              name="message"
              required
              value={values.message}
              onChange={(e) => setField('message', e.target.value)}
            />
            <label className="contact__label" htmlFor="message">Сообщение</label>
          </div>

          <div className={`contact__form-group contact__form-group--checkbox ${errors.consent ? 'contact__form-group--error' : ''}`}>
            <label className="contact__checkbox-label">
              <input
                type="checkbox"
                name="consent"
                checked={values.consent}
                onChange={handleCheckboxChange}
                required
              />
              <span className="contact__checkbox-custom"></span>
              <span className="contact__checkbox-text">
                Я согласен на обработку  персональных данных 
              </span>
            </label>
            {errors.consent && <span className="contact__error-text">{errors.consent}</span>}
          </div>

          <button className="contact__submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'ОТПРАВКА…' : 'ОТПРАВИТЬ →'}
          </button>

          {status.text && (
            <div className={`contact__status contact__status--${status.type} is-visible`} role="status">
              {status.text}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default Forma;