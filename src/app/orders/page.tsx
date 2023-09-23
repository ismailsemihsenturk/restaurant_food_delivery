"use client"
import { CartItemType, OrderType } from '@/types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import { stat } from 'fs';
import { toast } from 'react-toastify';

const OrdersPage = () => {

  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/");
  }

  // In server side we can just use fetch.But in client side react - query has a strong caching mechanism.
  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      fetch('http://localhost:3000/api/orders').then(
        (res) => res.json(),
      ),
  });

  const queryClient = useQueryClient();


  //Make a PUT request and if it's succeed than trigger orders query again.
  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => {
      return fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(status),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    }
  });



  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;
    mutation.mutate({ id, status });
    toast.success("The order status has been changed.");
  };

  if (isLoading || status === "loading") return "Loading...";

  return (
    <div className='p-4 lg:px-20 xl:px-40'>
      <table className='w-full border-separate border-spacing-3'>
        <thead className=''>
          <tr className='text-left'>
            <th className='hidden md:block'>Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className='hidden md:block'>Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className=''>
          {
            data.map((order: OrderType) => (
              <tr className={`${order.status !== "delivered" && "bg-red-50"}`} key={order.id}>
                <td className='hidden md:block py-6 px-1'>{order.id}</td>
                <td className='py-6 px-1'>{order.createdAt}</td>
                <td className='py-6 px-1'>{order.price}</td>
                {
                  order.products.map((product: CartItemType) => (
                    < td className='hidden md:block py-6 px-1'>{product.title}</td>
                  ))
                }
                {
                  session?.user.isAdmin ?
                    (
                      <td className='py-6 px-1'>
                        <form className='flex items-center justify-center gap-4' onSubmit={(e) => handleUpdate(e, order.id)}>
                          <input placeholder={order.status} className='p-2 ring-1 ring-red-100 rounded-md' />
                          <button className='bg-red-400 p-2 rounded-full'>
                            <Image alt="" src="/edit.png" width={20} height={20} />
                          </button>
                        </form>

                      </td>
                    ) :
                    (
                      <td className='py-6 px-1'>{order.status}</td>
                    )
                }
              </tr>
            ))
          }
        </tbody>
      </table>

    </div >
  )
}

export default OrdersPage
