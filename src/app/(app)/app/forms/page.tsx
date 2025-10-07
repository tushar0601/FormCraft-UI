"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormStore } from "@/store/formStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FormCreateRequest } from "@/types/form_request";
import { useCreateForm } from "@/queries/forms.queries";

export default function FormsPage() {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const pageSize = 5;
  const { allForms } = useFormStore();
  const pages = Math.max(1, Math.ceil(allForms.length / pageSize));
  const slice = allForms.slice((page - 1) * pageSize, page * pageSize);

  const { mutate: createForm, isPending } = useCreateForm();

  const onCreate = async () => {
    try {
      const formRequest: FormCreateRequest = {
        title: "Untitled Form",
        status: "Draft",
        access: "PUBLIC",
        questions: [],
      };
      createForm(formRequest, {
        onSuccess: (data) => {
          console.log("Form Created: ", data);
          router.push(`/app/forms/${data.slug}/builder`);
        },
        onError: (err) => {
          console.error("Failed to create form: ", err);
        },
      });
    } catch {
      console.log("Failed");
    }
  };

  return (
    <Card>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="m-0">Forms</CardTitle>
          <Button size="sm" onClick={onCreate} disabled={isPending}>
            {isPending ? "Creating…" : "Create a new Form"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slice.map((f) => (
              <TableRow key={f.id}>
                <TableCell className="font-medium">
                  <Link href={`/app/forms/${f.id}`} className="underline">
                    {f.title}
                  </Link>
                </TableCell>
                <TableCell>{f.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between p-3">
          <div className="text-sm">
            Page {page} of {pages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page === pages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
