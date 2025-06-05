<template>
  <BaseLayout>
    <div class="p-4 space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">👥 Dashboard Users</h1>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow space-y-4">
        <form
          @submit.prevent="inviteUser"
          class="flex flex-col md:flex-row gap-4"
        >
          <input
            v-model="email"
            type="email"
            required
            placeholder="User email"
            class="flex-1 border px-4 py-2 rounded-xl"
          />
          <select v-model="role" required class="border px-4 py-2 rounded-xl">
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
          <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
          >
            Invite
          </button>
        </form>

        <div v-if="users.length" class="overflow-x-auto mt-6">
          <table class="w-full table-auto border-t">
            <thead>
              <tr class="text-left border-b">
                <th class="py-2 px-4">Email</th>
                <th class="py-2 px-4">Role</th>
                <th class="py-2 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="u in users" :key="u._id" class="border-b">
                <td class="py-2 px-4">{{ u.email }}</td>
                <td class="py-2 px-4">
                  <select
                    v-model="u.role"
                    @change="changeRole(u._id, u.role)"
                    class="bg-transparent"
                    :disabled="u.isSelf"
                  >
                    <option value="owner">Owner</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </td>
                <td class="py-2 px-4 text-right">
                  <button
                    @click="removeUser(u._id)"
                    class="text-red-500 hover:underline"
                    :disabled="u.isSelf"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="text-gray-500 italic text-center mt-4">
          No users yet.
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  getDashboardUsers,
  inviteDashboardUser,
  updateUserRole,
  deleteDashboardUser,
} from "../services/dashboardUsersService";
import { useRoute } from "vue-router";
import BaseLayout from "../layouts/BaseLayout.vue";

const route = useRoute();
const dashboardId = route.params.id as string;

const email = ref("");
const role = ref<"editor" | "viewer">("editor");
const users = ref<any[]>([]);

const fetchUsers = async () => {
  const res = await getDashboardUsers(dashboardId);
  users.value = res.map((u: any) => ({
    ...u,
    isSelf: u.isCurrentUser, // prevent changing own role
  }));
};

const inviteUser = async () => {
  await inviteDashboardUser(dashboardId, {
    email: email.value,
    role: role.value,
  });
  email.value = "";
  role.value = "editor";
  fetchUsers();
};

const changeRole = async (userId: string, newRole: string) => {
  await updateUserRole(dashboardId, userId, newRole);
};

const removeUser = async (userId: string) => {
  await deleteDashboardUser(dashboardId, userId);
  fetchUsers();
};

onMounted(() => {
  fetchUsers();
});
</script>
