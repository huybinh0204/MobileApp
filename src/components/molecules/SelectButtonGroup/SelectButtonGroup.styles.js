import styled from '@emotion/native';

export const SelectButtonGroupContainer = styled.View({
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
});

export const Spacer = styled.View(({ theme }) => ({
  width: theme.spacing.s,
}));
