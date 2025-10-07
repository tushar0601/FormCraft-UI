"use client";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { responsesMock } from "@/data/mock";
import { useFormListQuery } from "@/queries/forms.queries";
import { useFormStore } from "@/store/formStore";
import { useEffect } from "react";

export default function DashboardCards() {
  const r = responsesMock.slice(0, 5);

  const { data, isLoading } = useFormListQuery(0, 50);
  const { allForms, setAllForms } = useFormStore();

  useEffect(() => {
    if (data) setAllForms(data);
  }, [data, setAllForms]);

  if (isLoading) {
    return <p className="p-4 text-sm text-muted-foreground">Loading...</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex-row items-center justify-between p-4">
          <CardTitle>Recent Forms</CardTitle>
          <Link href="/app/forms" className="text-sm underline">
            All
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Form</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allForms.map((x) => (
                <TableRow key={x.id}>
                  <TableCell className="font-medium">
                    <Link href={`/app/forms/${x.id}`} className="underline">
                      {x.title}
                    </Link>
                  </TableCell>
                  <TableCell>{x.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between p-4">
          <CardTitle>Recent Responses</CardTitle>
          <Link href="/app/forms" className="text-sm underline">
            Open
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Form</TableHead>
                <TableHead>Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {r.map((x) => (
                <TableRow key={x.id}>
                  <TableCell className="font-medium">{x.formName}</TableCell>
                  <TableCell>{x.submittedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
