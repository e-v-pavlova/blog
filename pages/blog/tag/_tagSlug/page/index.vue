<script>
export default {
  middleware({ redirect }) {
    return redirect('301', '/blog/tag');
  },
};
</script>
