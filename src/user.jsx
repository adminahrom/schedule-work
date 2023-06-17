import React, { useRef, useState, useCallback } from 'react';
import { Cron } from 'react-js-cron';
import 'react-js-cron/dist/styles.css';

export function User() {
	const inputRef = useRef(null);
	const defaultValue = '10 5 * * *';
	const [value, setValue] = useState(defaultValue);
	const customSetValue = useCallback(
		newValue => {
			setValue(newValue);
			inputRef.current?.setValue(newValue);
		},
		[inputRef]
	);
	const [error, onError] = useState();

	return (
		<div>
			<input
				ref={inputRef}
				onBlur={event => {
					setValue(event.target.value);
				}}
				onPressEnter={() => {
					setValue(inputRef.current?.input.value || '');
				}}
			/>

			<Cron value={value} setValue={customSetValue} onError={onError} />

			<div>
				<span style={{ fontSize: 12 }}>
					Дважды щелкните по выпадающему списку, чтобы автоматически выбрать /
					отменить выбор периодичности
				</span>
			</div>

			<p style={{ marginTop: 20 }}>
				Ошибка: {error ? error.description : 'undefined'}
			</p>
		</div>
	);
}
