import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/operations';
import {
  getFilteredContactsList,
  selectContacts,
  selectIsLoading,
  selectError,
} from 'redux/selectors';
// import PropTypes from 'prop-types';
import {
  ContactsList,
  ContactsItem,
  ContactsName,
  DelContactBtn,
} from './ContactList.styled';

function ContactList() {
  const distpatch = useDispatch();
  const filteredContacts = useSelector(getFilteredContactsList);
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return (
    <>
      {isLoading && !error && <b>Request in progress...</b>}
      {error && <span>{error.message}</span>}
      {
        <ContactsList>
          {contacts &&
            filteredContacts.map(({ id, name, number }) => (
              <ContactsItem key={id}>
                <ContactsName>
                  {name}: {number}
                </ContactsName>
                <DelContactBtn
                  type="button"
                  onClick={() => distpatch(deleteContact(id))}
                >
                  Delete
                </DelContactBtn>
              </ContactsItem>
            ))}
        </ContactsList>
      }
    </>
  );
}

export default ContactList;

// ContactList.propTypes = {
//   contacts: PropTypes.array.isRequired,
//   onDelContact: PropTypes.func.isRequired,
// };
