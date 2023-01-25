import React from 'react';
import "./FormSection.css"

function Section({labelText, value, setValue}) {

    return (
        <section>
            <label className="label">{labelText}</label>
            <input
                size={40}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </section>
    )
}
export default Section