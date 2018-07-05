import Modal from './Components/Modal';
import Form from './Components/Form';
import './Modules/AjaxModule';
import './Modules/SugarDOM';
import './Components/FormInterfaces';

(function () {
	(<any>window).Modal = Modal;
	(<any>window).Form = Form;
}())