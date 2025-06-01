"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function LogoutDialog({ signOutFn }: any) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-medium">Confirm Logout</h2>
        </DialogHeader>
        <DialogDescription>Are you sure you want to logout?</DialogDescription>
        <form action={async () => signOutFn()}>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              className="cursor-pointer"
              type="button"
              variant="ghost"
              onClick={() => {
                setOpen(false);
                router.back();
              }}
            >
              Cancel
            </Button>
            <Button
              className="cursor-pointer"
              type="submit"
              variant="destructive"
            >
              Logout
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
