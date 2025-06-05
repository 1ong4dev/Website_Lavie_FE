'use client'
import { useAuth } from '@/contexts/AuthContext';
import {useState, useEffect} from 'react';
import {customerService, Customer} from '@/services/api/customerService';

export default function CustomerProfilePage() {
  const { user } = useAuth();
  const [customers, setCustomers] = useState<Customer | null>(null);

  useEffect( () => {
    fetchCustomer(user?.id || '');
  },[]);

  const fetchCustomer = async (id: string) => {
    try {
    const Customers = await customerService.getCustomers();
    const Customer = Customers.find (c => c.userId == id);
    setCustomers(Customer ?? null);
    }
    catch (error) {
      console.error('Lỗi khi lấy thông tin khách hàng:', error);
    }
  }


  return (
    <div className="max-w-xl mx-auto mt-8 bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Thông tin tài khoản</h1>
      <div className="space-y-4">
        <div>
          <span className="font-medium text-gray-700">Tên khách hàng:</span>
          <span className="ml-2 text-gray-900">{user?.name}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Tên đăng nhập:</span>
          <span className="ml-2 text-gray-900">{user?.username}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Vai trò:</span>
          <span className="ml-2 text-gray-900">Khách hàng</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Loại khách hàng:</span>
          <span className="ml-2 text-gray-900">{customers?.type === 'retail' ? 'Khách hàng lẻ' : 'Đại lý cấp 2'}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Số điện thoại:</span>
          <span className="ml-2 text-gray-900">{customers?.phone}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Địa chỉ:</span>
          <span className="ml-2 text-gray-900">{customers?.address}</span>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <button
                  onClick={() => {}}
                  className="btn btn-primary flex items-center"
                >
                  Sửa thông tin
                </button>
      </div>
      {/* Nếu muốn thêm chức năng đổi mật khẩu, có thể bổ sung form ở đây */}
    </div>
  );
} 