// core
import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import * as Yup from 'yup';
import _ from 'lodash';
import { book } from '../../routes';
// proj
import { register, setVisiblePrivacyModal } from '../../redux/register';
import { PrivacyPolicyModal } from '../../components';
import { CustomInputComponent } from '../common/customInput';
import { CustomCheckboxComponent } from '../common/customCheckbox';
import { CustomSelectComponent } from '../common/customSelect';
import errorImg from '../common/Bomb_server_Error.jpg';
import { PhoneInput } from 'forms/common/phoneInput';
// own
import styles from '../common/styles.module.css';

const { formWrap, title, submit, backgroundSection, systemError, checkBoxText } = styles;

const requiredShortString = Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required');
const optionalString = Yup.string().nullable(true);

const RegisterSchema = Yup.object().shape({
    password:  requiredShortString,
    phone:     requiredShortString,
    updates:   Yup.boolean().oneOf([ true ]),
    firstName: requiredShortString,
    lastName:  requiredShortString,
    city:      requiredShortString,
    skills:    requiredShortString,
    others:    Yup.string().when('skills', {
        is:        'other',
        then:      requiredShortString,
        otherwise: optionalString,
    }),
    terms: Yup.boolean().oneOf([ true ]),

    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    passwordConfirm: Yup.string()
        .oneOf([ Yup.ref('password'), null ], 'Passwords should be equal')
        .required('Password confirm is required'),
});

const OTHER_VALUE = 'other';
const options = [
    {
        label: 'Java',
        value: 'java',
    },
    {
        label: 'JavaScript',
        value: 'javaScript',
    },
    {
        label: 'BigData',
        value: 'bigData',
    },
    {
        label: 'Automated Testing',
        value: 'dutomatedTesting',
    },
    {
        label: 'Functional Testing',
        value: 'dunctionaTesting',
    },
    {
        label: 'DevOps.CI/CD',
        value: 'devOps.CI/CD',
    },
    {
        label: 'Project Management',
        value: 'projectManagement',
    },
    {
        label: 'Android',
        value: 'android',
    },
    {
        label: 'Other',
        value: OTHER_VALUE,
    },
];

class LoginForm extends Component {
    componentDidUpdate() {
        const { history, shouldConfirmRegistration } = this.props;
        if(shouldConfirmRegistration) {
            history.push(`${book.registerConfirm}`)
        }
    }

    render() {
        const { register, setVisiblePrivacyModal } = this.props;
        const { visiblePrivacyModal, registerErrors, isLoading } = this.props;
        const errorMsg = _.get(registerErrors, 'errorMsg')
        return (
            <div className={ formWrap }>
                <h1 className={ title }>New Player</h1>
                { errorMsg&& (
                    <div className={ systemError }>
                        <img src={ errorImg } alt='' />
                        {errorMsg}
                    </div>
                ) }
                <Formik
                    initialValues={ {
                        password:        '',
                        lastName:        '',
                        firstName:       '',
                        passwordConfirm: '',
                        phone:           '',
                        city:            '',
                        email:           '',
                        skills:          '',
                        others:          '',
                        terms:           false,
                        updates:         false,
                    } }
                    validationSchema={ RegisterSchema }
                    onSubmit={ payload => {
                        const { skills, others, ...otherFields } = payload;
                        const user = {
                            ..._.omit(otherFields, [ 'passwordConfirm', 'terms' ]),
                            skills: skills === OTHER_VALUE ? others : skills,
                        };

                        register(user);
                    } }
                >
                    { props => (
                        <Form>
                            <div className={ backgroundSection }>
                                <Field
                                    name='firstName'
                                    placeholder='First name*'
                                    component={ CustomInputComponent }
                                />
                                <Field
                                    name='lastName'
                                    placeholder='Last name*'
                                    component={ CustomInputComponent }
                                />
                                <Field
                                    type='email'
                                    name='email'
                                    errors={ _.get(
                                        registerErrors,
                                        'errorMsg',
                                    ) }
                                    placeholder='Email*'
                                    component={ CustomInputComponent }
                                />
                                  <Field
                                      type='phone'
                                      name='phone'
                                      placeholder='Phone number*'
                                      component={ PhoneInput }
                                      errors={ _.get(
                                          registerErrors,
                                          'errorMsg',
                                      ) }
                                  />
                                <Field
                                    type='password'
                                    name='password'
                                    placeholder='Password*'
                                    component={ CustomInputComponent }
                                />
                                <Field
                                    type='password'
                                    name='passwordConfirm'
                                    placeholder='Password again*'
                                    component={ CustomInputComponent }
                                />
                                <Field
                                    name='city'
                                    placeholder='City*'
                                    component={ CustomInputComponent }
                                />
                                <Field
                                    component={ CustomSelectComponent }
                                    placeholder='Skills*'
                                    name='skills'
                                    options={ options }
                                />
                                { _.get(props, 'values.skills') ===
                                    OTHER_VALUE && (
                                    <Field
                                        name='others'
                                        placeholder='Other*'
                                        component={ CustomInputComponent }
                                    />
                                ) }
                            </div>

                            <Field
                                name='terms'
                                component={ CustomCheckboxComponent }
                                label={
                                    <div
                                        className={ checkBoxText }
                                        onClick={ () =>
                                            setVisiblePrivacyModal(true)
                                        }
                                    >
                                        I agree to the privacy policy
                                        <div style={{ textDecoration: 'underline' }}>
                                            (please click on the link for details)
                                        </div>
                                    </div>
                                }
                                type='checkbox'
                            />

                            <Field
                                name='updates'
                                component={ CustomCheckboxComponent }
                                label={
                                    <div
                                        className={ checkBoxText }
                                    >
                                        I want to receive letters about the possibility of remote work: vacancies, news articles, events and other information related to the innovative program for IT professionals and developers who want to work remotely
                                    </div>
                                }
                                type='checkbox'
                            />
                            <PrivacyPolicyModal
                                action={ accept => {
                                    props.setFieldTouched('terms');
                                    props.setFieldValue('terms', accept);
                                } }
                                isOpen={ visiblePrivacyModal }
                                setVisible={ setVisiblePrivacyModal }
                            />

                            <div className={ backgroundSection }>
                                <button
                                    disabled={ isLoading }
                                    className={ submit }
                                    type='submit'
                                >
                                    Continue
                                </button>
                            </div>
                        </Form>
                    ) }
                </Formik>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    registerErrors:            state.register.registerErrors,
    isLoading:                 state.register.isLoading,
    visiblePrivacyModal:       state.register.visiblePrivacyModal,
    shouldConfirmRegistration: state.register.shouldConfirmRegistration,
});

const mapDispatchToProps = { register, setVisiblePrivacyModal };

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    withRouter,
)(LoginForm);
