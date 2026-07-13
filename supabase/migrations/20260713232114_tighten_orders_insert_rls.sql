/*
# Tighten RLS on orders INSERT policy

## Problem
The previous `anon_insert_orders` policy used `WITH CHECK (true)`, which flags as
unrestricted access — any anon client could insert arbitrary rows with no constraints.

## Fix
Replace the always-true check with explicit business-logic constraints:
  - customer_name must be a non-empty string.
  - customer_phone must be a non-empty string.
  - delivery_type must be one of the two valid values ('delivery' or 'pickup').
  - status must be 'pending' — customers cannot self-assign any other status.

This prevents abuse (bogus rows, status escalation) while still allowing legitimate
order submissions from unauthenticated customers.
*/

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;

CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(trim(customer_name)) > 0
    AND char_length(trim(customer_phone)) > 0
    AND delivery_type IN ('delivery', 'pickup')
    AND status = 'pending'
  );
