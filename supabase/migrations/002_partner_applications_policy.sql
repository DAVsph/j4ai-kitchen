-- Allow anonymous visitors to submit a partner application.
-- No SELECT policy is created: public visitors cannot read applications.

create policy "public can submit partner application"
on public.partner_applications
for insert
to anon, authenticated
with check (
  consent_to_contact = true
  and length(trim(store_name)) > 1
  and length(trim(contact_name)) > 1
  and position('@' in email) > 1
);
