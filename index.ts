import Modal from './Components/Modal';
import Form from './Components/Form';
import './Modules/AjaxModule';
import './Modules/SugarDOM';

(function () {
	(<any>window).Modal = Modal;
	(<any>window).Form = Form;
}())  