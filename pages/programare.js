import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Programare = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <div>
      <Form className="m-auto p-3 bg-gray rounded" style={{maxWidth: "50rem"}} id="form-programare" onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formName'>
          <Form.Label>Nume</Form.Label>
          <Form.Control type='text' placeholder='Nume' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formSurname'>
          <Form.Label>Prenume</Form.Label>
          <Form.Control type='text' placeholder='Prenume' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formPhone'>
          <Form.Label>Telefon</Form.Label>
          <Form.Control type='text' placeholder='Telefon' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Adresa email' />
          <Form.Text className='text-muted'>
            Confirmarea programării va fi trimisă pe această adresă de email.
          </Form.Text>
        </Form.Group>
        <Form.Group className='mb-3' >
          <Form.Label>Intervalul de timp preferat</Form.Label>
          <Form.Select>
            <option value="null">oricând</option>
            <option value="morning">înainte de ora 12</option>
            <option value="afternoon">după ora 12</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicCheckbox' id="customCheckbox">
          <Form.Check type='checkbox' label='Acord consimțământul preluării datelor personale' isValid/>
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button variant='success' type='submit'>
            Fă-ți o programare
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default Programare;