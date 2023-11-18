import React, { useState, useEffect, useRef } from "react";
import { toast } from 'react-toastify';

import ReactEchart from "../../Component/reactEchart";
import { getAdminDashboard, updateAdminDashboard } from "../../Services/dashboardService";
import { getLocalStorage } from "../../utils/localStorage";
import { getEditedFields } from "../../utils/util";

import "./dashboard.css";

function Dashboard(props) {
    const adminRefData = useRef(null);
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const loginId = getLocalStorage("loginId");

    const amountKeysAndMin = {
        category_6: 99,
        category_7: 79,
        category_8: 59,
        category_9: 39,
        category_10: 19,
    }

    useEffect(() => {
        setLoading(true);
        if(loginId){
            fetchAdminDashboard(loginId);
        }
    }, [loginId]);

    const fetchAdminDashboard = async (id) => {
        const response = await getAdminDashboard(id);
        if (response.data !== null) {
            setAdminData(response.data);
            adminRefData.current = {
                charge_customers: response.data.charge_customers,
                amount: { ...response.data.amount },
            }
        } else {
            setAdminData(null);
        }
        setLoading(false);
    }

    const onChangeChargeCustomer = (value) => {
        const updatedAdminData = {
            ...adminData,
            charge_customers: value
        }
        setAdminData(updatedAdminData);
    }

    const onChangeCustomAmount = (event) => {
        const { name, value } = event.target;
        const updatedAdminData = {
            ...adminData,
            amount: {
                ...adminData.amount,
                [name]: Number(value)
            }
        }
        setAdminData(updatedAdminData);
    }

    const validateSubmit = () => {
        if (!adminData.charge_customers) {
            return false;
        }
        if (adminData.charge_customers && !adminData.hasOwnProperty("amount")) {
            return false;
        }
        let validAmountProperties = true;
        let validEnteredAmounts = true;
        if (adminData.charge_customers && adminData.hasOwnProperty("amount")) {
            const defaultAmountKeys = Object.keys(amountKeysAndMin);
            for (const key of defaultAmountKeys) {
                if (!adminData.amount.hasOwnProperty(key)) {
                    validAmountProperties = false;
                } else if (!adminData.amount[key].toString()) {
                    validAmountProperties = false;
                }
            }
        }
        const amountKeys = Object.keys(adminData.amount);
        for (const key of amountKeys) {
            if (amountKeysAndMin[key] > adminData.amount[key]) {
                validEnteredAmounts = false;
            }
        }
        return validAmountProperties && validEnteredAmounts
    }

    const onSaveDashboardChanges = () => {
        const originalData = adminRefData.current;
        const patchData = getEditedFields(originalData, adminData);
        if (Object.keys(patchData).length > 0) {
            setIsSaving(true);
            onSubmitAdminDashboard(patchData);
        }
    }

    const onSubmitAdminDashboard = async (patchData) => {
        const response = await updateAdminDashboard({ id: loginId, data: patchData });
        if (response.data) {
            toast(response.message, { type: "success" });
            if(loginId){
                setLoading(true);
                fetchAdminDashboard(loginId);
            }
        } else {
            toast(response.message, { type: "error" });
        }
        setIsSaving(false);
    }

    return (
        <div className="DashboardContainer">
            {(loading) && <div className="DisplayText">Loading..</div>}
            {(!loading && adminData !== null) &&
                (<div>
                    <div>
                        <div className="DashboardTitle">{adminData.name}, {adminData.location} on Dhun Jam</div>
                        <div className="FieldContainer">
                            <div className="InputFieldLabel">Do you want to charge your customers for requesting songs?</div>
                            <div className="ChargeCustomerContainer">
                                <label className="ChargeCustomerLabelWrapper">
                                    <input className="ChargeCustomerInputField" type="radio" name="charge_customers" defaultChecked={!!adminData.charge_customers} onClick={() => onChangeChargeCustomer(true)} />
                                    <div className="ChargeCustomerInputLabel">Yes</div>
                                </label>
                                <label className="ChargeCustomerLabelWrapper">
                                    <input className="ChargeCustomerInputField" type="radio" name="charge_customers" defaultChecked={!adminData.charge_customers} onClick={() => onChangeChargeCustomer(false)} />
                                    <div className="ChargeCustomerInputLabel">No</div>
                                </label>
                            </div>
                        </div>
                        <div className="FieldContainer">
                            <div className="InputFieldLabel">Custom song request amount - </div>
                            <div className="CustomFieldContainer">
                                <input
                                    className={`CustomAmountInputField  ${adminData.charge_customers ? 'NormalInputField' : 'GreyOutInputField'}`}
                                    disabled={!adminData.charge_customers}
                                    type="number"
                                    name="category_6"
                                    min={amountKeysAndMin.category_6}
                                    value={adminData.amount.category_6}
                                    onChange={onChangeCustomAmount}
                                />
                            </div>
                        </div>
                        <div className="FieldContainer">
                            <div className="InputFieldLabel">Regular song request amounts, from high to low - </div>
                            <div className="RegularFieldContainer">
                                <input
                                    className={`RegularAmountInputField  ${adminData.charge_customers ? 'NormalInputField' : 'GreyOutInputField'}`}
                                    disabled={!adminData.charge_customers}
                                    type="number"
                                    name="category_7"
                                    min={amountKeysAndMin.category_7}
                                    value={adminData.amount.category_7}
                                    onChange={onChangeCustomAmount}
                                />
                                <input
                                    className={`RegularAmountInputField  ${adminData.charge_customers ? 'NormalInputField' : 'GreyOutInputField'}`}
                                    disabled={!adminData.charge_customers}
                                    type="number"
                                    name="category_8"
                                    min={amountKeysAndMin.category_8}
                                    value={adminData.amount.category_8}
                                    onChange={onChangeCustomAmount}
                                />
                                <input
                                    className={`RegularAmountInputField  ${adminData.charge_customers ? 'NormalInputField' : 'GreyOutInputField'}`}
                                    disabled={!adminData.charge_customers}
                                    type="number"
                                    name="category_9"
                                    min={amountKeysAndMin.category_9}
                                    value={adminData.amount.category_9}
                                    onChange={onChangeCustomAmount}
                                />
                                <input
                                    className={`RegularAmountInputField  ${adminData.charge_customers ? 'NormalInputField' : 'GreyOutInputField'}`}
                                    disabled={!adminData.charge_customers}
                                    type="number"
                                    name="category_10"
                                    min={amountKeysAndMin.category_10}
                                    value={adminData.amount.category_10}
                                    onChange={onChangeCustomAmount}
                                />
                            </div>
                        </div>
                        {(!!adminData.charge_customers) && (
                            <div className="GraphFieldContainer">
                                <div className="GraphFieldLabel">Graph - </div>
                                <div>
                                    <ReactEchart
                                        data={[
                                            adminData.amount.category_6,
                                            adminData.amount.category_7,
                                            adminData.amount.category_8,
                                            adminData.amount.category_9,
                                            adminData.amount.category_10,
                                        ]}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="SaveBtnContainer">
                        <button
                            type="button"
                            className={validateSubmit() ? "NormalSaveBtn" : "GreyoutSaveBtn"}
                            onClick={onSaveDashboardChanges}
                            disabled={!!isSaving || !validateSubmit()}>
                            Save
                        </button>
                    </div>
                </div>)
            }
            {(!loading && adminData === null) && (<div className="DisplayText">No Data Found</div>)}
        </div>
    )
}

export default Dashboard;