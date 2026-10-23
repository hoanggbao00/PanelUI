'use client';

import { Alert } from 'panelui-web/alert';

export default function AlertFieldDetails() {
  return (
    <Alert tone="destructive" className="w-full max-w-md">
      <Alert.Icon />
      <Alert.Title>3 fields need another look</Alert.Title>
      <Alert.Description>The invoice can be sent once they are fixed.</Alert.Description>
      <Alert.Details label="Show the fields">
        <Alert.Item>The billing address has no postcode.</Alert.Item>
        <Alert.Item>A VAT number has 9 digits; this one has 7.</Alert.Item>
        <Alert.Item>The due date is before the issue date.</Alert.Item>
      </Alert.Details>
    </Alert>
  );
}
